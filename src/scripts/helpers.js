export const formatDate = date => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };
  const formatter = new Intl.DateTimeFormat(navigator.language, options);
  return formatter.format(date);
};

export const formatTime = date => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(navigator.language, options);
  return formatter.format(date);
};

export const isDay = date => {
  console.log(date);
};

export const getImagePath = (id, day = true) => {
  const str = day ? 'day' : 'night';
  // clear sky
  if (id === 800) return `${str}.svg`;
  // clouds
  if (id === 801) return `cloudy-${str}-1.svg`;
  if (id === 802) return `cloudy-${str}-2.svg`;
  if (id === 803) return `cloudy-${str}-3.svg`;
  if (id === 804) return `cloudy.svg`;
  // rain
  if ([300, 301, 500, 501].includes(id)) return `rainy-1.svg`;
  if ([302, 502].includes(id)) return `rainy-2.svg`;
  if ([310, 503].includes(id)) return `rainy-3.svg`;
  if ([311, 504].includes(id)) return `rainy-4.svg`;
  if ([312, 520].includes(id)) return `rainy-5.svg`;
  if ([313, 522].includes(id)) return `rainy-6.svg`;
  if ([314, 321, 522, 531].includes(id)) return `rainy-7.svg`;
  // snow
  if ([511, 600, 601].includes(id)) return `snowy-1.svg`;
  if ([602, 611].includes(id)) return `snowy-2.svg`;
  if ([612, 613, 615].includes(id)) return `snowy-3.svg`;
  if ([616, 620].includes(id)) return `snowy-4.svg`;
  if ([621].includes(id)) return `snowy-5.svg`;
  if ([622].includes(id)) return `snowy-6.svg`;
  // thunder
  if (id >= 200 && id <= 299) return `thunder.svg`;
  // mist
  if (id >= 700 && id <= 799) return `cloudy.svg`;
};
