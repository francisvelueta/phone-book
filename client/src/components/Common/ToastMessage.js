import { Toast, ToastBody, ToastHeader } from 'reactstrap';

const ToastMessage = props => {
  return (
    <Toast isOpen={props.status}>
      <ToastHeader icon='danger'>Error</ToastHeader>
      <ToastBody>{props.message}</ToastBody>
    </Toast>
  );
};

export default ToastMessage;
