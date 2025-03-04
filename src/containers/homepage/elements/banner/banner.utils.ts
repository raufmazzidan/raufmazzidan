export const getGreeting = () => {
  const hour = new Date().getHours();
  const greetings: any = {
    morning: [
      "Good morning👋",
      "좋은 아침👋",
      "Selamat pagi👋",
      "Bonjour👋",
      "おはようございます👋",
      "早上好👋",
      "Buenos días👋",
      "สวัสดีตอนเช้า👋",
    ],
    afternoon: [
      "Good afternoon🙌",
      "좋은 오후🙌",
      "Selamat siang🙌",
      "Bon après-midi🙌",
      "こんにちは🙌",
      "Buenas tardes🙌",
      "下午好🙌",
      "สวัสดีตอนบ่าย🙌",
    ],
    evening: [
      "Good evening🤟",
      "こんばんは🤟",
      "Selamat sore🤟",
      "Bonsoir🤟",
      "좋은 저녁🤟",
      "Buenas noches🤟",
      "晚上好🤟",
      "สวัสดีตอนเย็น🤟",
    ],
    night: [
      "Good night😴",
      "ราตรีสวัสดิ์😴",
      "Selamat malam😴",
      "Bonne nuit😴",
      "晚安😴",
      "Buenas noches😴",
      "おやすみなさい😴",
      "안녕히 주무세요😴",
    ],
  };

  let timeOfDay;
  if (hour >= 5 && hour < 12) {
    timeOfDay = "morning";
  } else if (hour >= 12 && hour < 17) {
    timeOfDay = "afternoon";
  } else if (hour >= 17 && hour < 21) {
    timeOfDay = "evening";
  } else {
    timeOfDay = "night";
  }

  return greetings[timeOfDay];
};
