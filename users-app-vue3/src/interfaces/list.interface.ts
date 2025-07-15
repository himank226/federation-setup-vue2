export interface User {
  id: number;
  name: string;
  email: string;
  label: string;
  message: string;
}

export interface Store {
  state: {
    users: User[];
  };
}

export interface Router {
  push(location: { name: string; query: { id: number } }): void;
}

export interface I18n {
  t(key: string): string;
  locale: string;
}
