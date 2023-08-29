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
