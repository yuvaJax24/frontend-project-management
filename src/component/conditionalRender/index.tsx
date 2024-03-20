/* eslint-disable @typescript-eslint/no-explicit-any */

const ConditionalRender = ({
  condition,
  children,
}: {
  condition: boolean;
  children: any;
}) => {
  return <>{condition ? children : null}</>;
};

export default ConditionalRender;
