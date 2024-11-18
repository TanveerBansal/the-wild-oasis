import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

// making this add into Compound Component
function AddCabin() {
  return (
    <div>
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
      
    </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModel, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button
//         variation="primary"
//         onClick={() => setIsOpenModal((curr) => !curr)}
//       >
//         Add new Cabin
//       </Button>
//       {isOpenModel && (
//         <Modal onClose={()=>setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={()=>setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
