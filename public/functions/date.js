document.getElementById('date').addEventListener('input', function () {
    const selectedDate = new Date(this.value);
    const day = selectedDate.getDay(); // Hafta kuni (0 = Yakshanba, 1 = Dushanba, ... , 6 = Shanba)
    const hours = selectedDate.getHours();
    const errorMessage = document.getElementById('error-message');
    
    // Hafta kunlari va vaqt cheklovlari
    const isWithinAllowedDays = day >= 1 && day <= 6; // 1 - Dushanba, 6 - Shanba
    const isWithinAllowedHours = hours >= 9 && hours < 18; // 9:00 dan 18:00 gacha

    if (!isWithinAllowedDays || !isWithinAllowedHours) {
      // Xato bo'lsa xabarni ko'rsatib, kiritilgan qiymatni tozalaymiz
      errorMessage.style.display = 'inline';
      this.value = ''; // Kiritilgan qiymatni tozalash
    } else {
      // Agar to'g'ri bo'lsa xabarni yashiramiz
      errorMessage.style.display = 'none';
    }
  });


  document.getElementById('date2').addEventListener('input', function () {
    const selectedDate = new Date(this.value);
    const day = selectedDate.getDay(); // Hafta kuni (0 = Yakshanba, 1 = Dushanba, ... , 6 = Shanba)
    const hours = selectedDate.getHours();
    const errorMessage = document.getElementById('error-messages');
    
    // Hafta kunlari va vaqt cheklovlari
    const isWithinAllowedDays = day >= 1 && day <= 6; // 1 - Dushanba, 6 - Shanba
    const isWithinAllowedHours = hours >= 9 && hours < 18; // 9:00 dan 18:00 gacha

    if (!isWithinAllowedDays || !isWithinAllowedHours) {
      // Xato bo'lsa xabarni ko'rsatib, kiritilgan qiymatni tozalaymiz
      errorMessage.style.display = 'inline';
      this.value = ''; // Kiritilgan qiymatni tozalash
    } else {
      // Agar to'g'ri bo'lsa xabarni yashiramiz
      errorMessage.style.display = 'none';
    }
  });