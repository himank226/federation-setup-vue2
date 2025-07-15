export interface User {
  id: number;
  name: string;
  email: string;
  label: string;
  message: string;
}

export interface Store {
  state: { users: User[] };
  updateUser(user: User): void;
}

export interface Router {
  currentRoute: {
    query: Record<string, any>;
  };
  push(location: { name: string }): void;
}

export interface I18n {
  locale: string;
  t(key: string): string;
}
