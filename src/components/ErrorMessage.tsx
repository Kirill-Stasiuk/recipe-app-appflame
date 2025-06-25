type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => (
  <p className="text-red-600 text-sm mb-2">{message}</p>
);

export default ErrorMessage;
