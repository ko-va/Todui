export default interface ContainerComponentProps {
  setToken(token: string, username: string): any;
  logout(): any;
  setAuthState(state: string): any;
  authState: string;
  username: string;
}
