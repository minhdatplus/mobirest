import mitt from 'mitt';

type Events = {
  'database.reset': void;
};

export const events = mitt<Events>(); 