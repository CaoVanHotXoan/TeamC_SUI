// Lấy tất cả các phần tử có class là 'card'
const cards = document.querySelectorAll('.card');

// Lắng nghe sự kiện cuộn trang (scroll)
window.addEventListener('scroll', () => {
    // Lấy chiều cao của cửa sổ trình duyệt
    const viewportHeight = window.innerHeight;
    
    cards.forEach((card, index) => {
        // Lấy vị trí và kích thước của thẻ hiện tại so với khung nhìn
        const rect = card.getBoundingClientRect();
        
        // Nếu không phải là thẻ cuối cùng và thẻ tiếp theo đang cuộn lên
        if (index < cards.length - 1) {
            const nextCard = cards[index + 1];
            const nextRect = nextCard.getBoundingClientRect();
            
            // Tính toán khoảng cách giữa đỉnh thẻ tiếp theo và đỉnh thẻ hiện tại
            const distance = nextRect.top - rect.top;
            
            // Nếu thẻ tiếp theo bắt đầu đè lên thẻ hiện tại (khoảng cách nhỏ hơn chiều cao màn hình)
            if (distance < viewportHeight && distance > 0) {
                // Kiểm tra xem có phải màn hình điện thoại không
                const isMobile = window.innerWidth <= 768;
                // Mức độ thu nhỏ tối đa (điện thoại thu nhỏ ít hơn để dễ đọc)
                const maxShrink = isMobile ? 0.95 : 0.90;
                
                // Tính toán tỷ lệ thu nhỏ dần dựa trên khoảng cách cuộn
                const factor = (1 - maxShrink) / viewportHeight;
                const scale = 1 - (viewportHeight - distance) * factor;
                
                // Giới hạn giá trị scale không nhỏ hơn maxShrink và không lớn hơn 1
                const finalScale = Math.max(maxShrink, Math.min(1, scale));
                
                // Áp dụng hiệu ứng thu nhỏ (scale) và tối màu dần (brightness)
                card.style.transform = `scale(${finalScale})`;
                card.style.filter = `brightness(${finalScale})`;
            } else if (distance <= 0) {
                // Khi thẻ bị đè (che khuất) hoàn toàn bởi thẻ tiếp theo
                const isMobile = window.innerWidth <= 768;
                const maxShrink = isMobile ? 0.95 : 0.90;
                card.style.transform = `scale(${maxShrink})`;
                card.style.filter = `brightness(${maxShrink})`;
            } else {
                // Khi thẻ chưa bị đè (trạng thái bình thường)
                card.style.transform = `scale(1)`;
                card.style.filter = `brightness(1)`;
            }
        }
    });
});
