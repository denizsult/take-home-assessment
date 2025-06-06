/* eslint-disable no-extra-boolean-cast */


type RenderIfProps = {
    condition: unknown;
    children: React.ReactNode;
    fallback?: React.ReactNode;
  };
  export const RenderIf = ({ condition, children, fallback }: RenderIfProps) => {
    return !!condition ? <>{children}</> : <>{fallback}</>;
  };
  