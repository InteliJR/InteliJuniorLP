/**
 * Script para converter e otimizar imagens para WebP
 * 
 * Uso: node scripts/convert-images.js
 *      node scripts/convert-images.js --force  (reconverte todas)
 * 
 * O script irá:
 * 1. Ler todas as imagens .png e .jpg da pasta public/images
 * 2. Redimensionar imagens muito grandes (max 1920px de largura)
 * 3. Converter para WebP com qualidade otimizada
 * 4. Pular imagens já convertidas
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const QUALITY = 70; // Qualidade WebP (reduzido para melhor compressão)
const MAX_WIDTH = 1280; // Largura máxima para web
const MAX_HEIGHT = 720; // Altura máxima
const SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

async function convertToWebP(inputPath, existingWebPs, forceReconvert = false) {
    const ext = path.extname(inputPath).toLowerCase();
    const baseName = path.basename(inputPath, ext);
    const outputPath = path.join(IMAGES_DIR, `${baseName}.webp`);

    // Pula se já for webp
    if (ext === '.webp') {
        return { status: 'is-webp' };
    }

    // Pula se não for uma extensão suportada
    if (!SUPPORTED_EXTENSIONS.includes(ext)) {
        return { status: 'unsupported' };
    }

    // Pula SVGs e outros formatos
    if (ext === '.svg' || ext === '.heic') {
        return { status: 'skip', name: baseName, ext };
    }

    // Verifica se já existe versão WebP (a menos que forceReconvert)
    if (!forceReconvert && existingWebPs.has(`${baseName}.webp`)) {
        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);
        return {
            status: 'already-converted',
            name: baseName,
            inputSize: (inputStats.size / 1024).toFixed(1),
            outputSize: (outputStats.size / 1024).toFixed(1)
        };
    }

    try {
        const inputStats = fs.statSync(inputPath);
        const inputSize = inputStats.size;

        // Lê metadados da imagem
        const metadata = await sharp(inputPath).metadata();

        let pipeline = sharp(inputPath);

        // Redimensiona se necessário
        let resized = false;
        if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
            pipeline = pipeline.resize(MAX_WIDTH, MAX_HEIGHT, {
                fit: 'inside',
                withoutEnlargement: true
            });
            resized = true;
        }

        await pipeline
            .webp({
                quality: QUALITY,
                effort: 6, // Maior esforço de compressão (0-6)
            })
            .toFile(outputPath);

        const outputStats = fs.statSync(outputPath);
        const outputSize = outputStats.size;

        const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);
        const inputSizeKB = (inputSize / 1024).toFixed(1);
        const outputSizeKB = (outputSize / 1024).toFixed(1);

        return {
            status: 'converted',
            name: baseName,
            inputSize: inputSizeKB,
            outputSize: outputSizeKB,
            savings,
            resized,
            originalDimensions: `${metadata.width}x${metadata.height}`
        };
    } catch (error) {
        console.error(`❌ Erro ao converter ${baseName}${ext}:`, error.message);
        return { status: 'error', name: baseName };
    }
}

async function main() {
    // Verifica se deve forçar reconversão
    const forceReconvert = process.argv.includes('--force') || process.argv.includes('-f');

    console.log('\n🖼️  Conversor de Imagens para WebP (Otimizado)\n');
    console.log(`📁 Pasta: ${IMAGES_DIR}`);
    console.log(`📊 Qualidade: ${QUALITY}%`);
    console.log(`📐 Max dimensões: ${MAX_WIDTH}x${MAX_HEIGHT}`);
    if (forceReconvert) {
        console.log(`🔄 Modo: Reconverter todas as imagens`);
    }
    console.log('\n' + '─'.repeat(65));

    const files = fs.readdirSync(IMAGES_DIR);

    // Cria set com WebPs existentes para verificação rápida
    const existingWebPs = new Set(files.filter(f => f.endsWith('.webp')));

    const converted = [];
    const alreadyConverted = [];
    const skipped = [];
    let totalInputSize = 0;
    let totalOutputSize = 0;

    for (const file of files) {
        const filePath = path.join(IMAGES_DIR, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile()) {
            const result = await convertToWebP(filePath, existingWebPs, forceReconvert);

            if (result.status === 'converted') {
                converted.push(result);
                totalInputSize += parseFloat(result.inputSize);
                totalOutputSize += parseFloat(result.outputSize);
                const resizeInfo = result.resized ? ` [redim. de ${result.originalDimensions}]` : '';
                console.log(`✅ ${result.name}: ${result.inputSize}KB → ${result.outputSize}KB (${result.savings}% menor)${resizeInfo}`);
            } else if (result.status === 'already-converted') {
                alreadyConverted.push(result);
                console.log(`⏭️  ${result.name}: já convertido (${result.outputSize}KB)`);
            } else if (result.status === 'skip') {
                skipped.push(result);
                console.log(`⚠️  ${result.name}${result.ext}: formato não suportado`);
            }
        }
    }

    console.log('─'.repeat(65));

    // Resumo
    console.log(`\n📈 Resumo:`);

    if (converted.length > 0) {
        const totalSavings = ((1 - totalOutputSize / totalInputSize) * 100).toFixed(1);
        console.log(`   ✅ ${converted.length} imagem(ns) convertida(s) agora`);
        console.log(`      • Original: ${totalInputSize.toFixed(1)}KB → WebP: ${totalOutputSize.toFixed(1)}KB (${totalSavings}% menor)`);
    }

    if (alreadyConverted.length > 0) {
        console.log(`   ⏭️  ${alreadyConverted.length} imagem(ns) já convertida(s) anteriormente`);
    }

    if (skipped.length > 0) {
        console.log(`   ⚠️  ${skipped.length} arquivo(s) ignorado(s) (SVG, HEIC, etc)`);
    }

    if (converted.length === 0 && alreadyConverted.length === 0) {
        console.log(`   ℹ️  Nenhuma imagem PNG/JPG encontrada para converter`);
    }

    // Lista tamanhos finais de todas as WebPs
    console.log(`\n📦 Tamanhos finais das imagens WebP:`);
    const webpFiles = fs.readdirSync(IMAGES_DIR)
        .filter(f => f.endsWith('.webp'))
        .map(f => {
            const size = fs.statSync(path.join(IMAGES_DIR, f)).size;
            return { name: f, size: (size / 1024).toFixed(1) };
        })
        .sort((a, b) => parseFloat(b.size) - parseFloat(a.size));

    let totalWebpSize = 0;
    webpFiles.forEach(f => {
        totalWebpSize += parseFloat(f.size);
        const sizeWarning = parseFloat(f.size) > 150 ? ' ⚠️ grande' : '';
        console.log(`   • ${f.name}: ${f.size}KB${sizeWarning}`);
    });
    console.log(`   ─────────────────────────`);
    console.log(`   Total: ${totalWebpSize.toFixed(1)}KB (${(totalWebpSize / 1024).toFixed(2)}MB)`);

    console.log(`\n💡 Dicas:`);
    console.log(`   • Use --force ou -f para reconverter todas as imagens`);
    console.log(`   • Imagens > 150KB podem impactar a performance`);
    console.log('\n');
}

main().catch(console.error);
