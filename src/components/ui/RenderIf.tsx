

type RenderIfProps = {
    condition: boolean;
    children: React.ReactNode;
    fallback?: React.ReactNode;
  };
  export const RenderIf = ({ condition, children, fallback }: RenderIfProps) => {
    return condition ? children : fallback;
  };
  