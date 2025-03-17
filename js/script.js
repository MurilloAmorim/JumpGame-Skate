document.addEventListener('DOMContentLoaded', (event) => {
    const skate = document.getElementById('skate');
    const caindo = document.getElementById('caindo');
    const pedrinha = document.getElementById('pedrinha');
    let isJumping = false;
    let gameOver = false;

    // Função para fazer o skate saltar
    function jump() {
        if (isJumping || gameOver) return;  // Evita múltiplos saltos ou saltar após game over
        isJumping = true;
        skate.classList.add('jump');
        setTimeout(() => {
            skate.classList.remove('jump');
            isJumping = false;
        }, 800);
    }

    // Detectar a colisão entre o skate e a pedrinha
    function checkCollision() {
        const skateRect = skate.getBoundingClientRect();
        const pedrinhaRect = pedrinha.getBoundingClientRect();

        const skateCollisionArea = {
            left: skateRect.left + 1,  // Ajusta para reduzir a área de colisão
            right: skateRect.right - 1,
            top: skateRect.top + 1,
            bottom: skateRect.bottom - 1
        };

        if (
            skateCollisionArea.left < pedrinhaRect.right &&
            skateCollisionArea.right > pedrinhaRect.left &&
            skateCollisionArea.bottom > pedrinhaRect.top &&
            skateCollisionArea.top < pedrinhaRect.bottom
        ) {
            if (!gameOver) { // Verifica se o jogo já está em estado de game over
                gameOver = true;
                skate.style.display = 'none';
                caindo.style.display = 'block';
                setTimeout(() => {
                    alert('Game Over!');
                    window.location.reload();
                }, 1000);  // Delay para mostrar o GIF de caindo antes de reiniciar
            }
        }
    }

    // Adiciona o evento de pular ao pressionar a tecla espaço
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            jump();
        }
    });

    // Adiciona o evento de pular ao clicar na tela
    document.addEventListener('click', () => {
        jump();
    });

    // Verifica a colisão a cada 50ms
    setInterval(checkCollision, 50);

    // Seleção de personagem
    const characterBoxes = document.querySelectorAll('.character-box');
    const selectedCharacterImage = document.getElementById('selected-character-image');

    characterBoxes.forEach(box => {
        box.addEventListener('click', function () {
            const characterGif = this.querySelector('img').src;
            selectedCharacterImage.src = characterGif;
            skate.src = characterGif;  // Atualiza o GIF do skate para o personagem selecionado
        });
    });
});
