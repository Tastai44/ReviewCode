import { Modal } from "@mui/material"
import UpsertAppointment, { UpsertAppointmentProps } from "./UpsertAppointment"

interface UpsertAppModalProps {
  openModal: boolean
}
function UpsertAppModal ({
  openModal,
  onSubmitSuccess,
  onClickCancel,
  defaultApp
}: UpsertAppModalProps & UpsertAppointmentProps){

  return <Modal
        open={openModal}
        onClose={onClickCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <UpsertAppointment 
        onClickCancel={onClickCancel} 
        onSubmitSuccess={onSubmitSuccess}
        defaultApp={defaultApp}
        />
</Modal>
}

export default UpsertAppModal