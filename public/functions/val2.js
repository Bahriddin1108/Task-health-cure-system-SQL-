document.addEventListener("DOMContentLoaded", () => {
    const date1 = document.getElementById("date4");
    const date2 = document.getElementById("date5");

    date2.addEventListener("change", (e) => {
        const date2_value = e.target.value;
        const dateTime1 = new Date(date1.value);
        const dateTime2 = new Date(date2_value);

        // Tekshiramiz: date2 date1 dan katta bo'lishi kerak
        if (dateTime2 <= dateTime1) {
            alert("Date 2 must be later than Date 1.");
            date2.value = ""; // date2 qiymatini tozalash
        }
    });
});
