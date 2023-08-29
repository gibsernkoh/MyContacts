export const getDate = (num, unit) => {
  const currentDate = new Date();

  const nextDate = new Date(currentDate);

  switch (unit) {
    case 'year': {
      nextDate.setFullYear(currentDate.getFullYear() + num);
    }
  }

  return nextDate;
};

export const getDiffBetweenToday = (date_str, unit) => {
  const date_1 = new Date(date_str);
  const date_2 = new Date();

  let diff = (date_2.getTime() - date_1.getTime()) / 1000;

  diff /= 60 * 60 * 24;

  const result = Math.abs(Math.round(diff / 365.25));

  console.log('result', result);
  return result;
};

export const getName = (name) => {
  const { first, last } = name;

  return `${first} ${last}`;
};

export const getAddress = (street) => {
  const values = Object.values(street);

  return values.join(' ');
};

export const getCompletePath = (filename) => {
  const runtimeConfig = useRuntimeConfig();

  return (
    runtimeConfig.public.supabase.url +
    runtimeConfig.public.supabase_profile_folder +
    filename
  );
};
