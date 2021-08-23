export default interface ContainerComponentProps {
  setToken(token: string, username: string): void;
  logout(): void;
  setAuthState(state: string): void;
  authState: string;
  username: string;
}
