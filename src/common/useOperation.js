export default function useOperation(props) {
  const cancelProps = {
    onCancel: () => props.setOpenDialog(false)
  };

  const addItemFormFactory = (props) => {
    const addFormProps = {
      ...cancelProps,
      onSave: props.onAdd
    };
    return props.addForm(addFormProps);
  }

  const itemFormFactory = (props, value) => {
    const editFormProps = {
      ...cancelProps,
      onSave: (newValue) => props.onEdit(value, newValue),
      value
    };
    return props.editForm(editFormProps);
  }

  const openForm = (form) => {
    props.setDialogContent(form);
    props.setOpenDialog(true);
    props.setMaxWidthDialog();
  }

  const handleAdd = (e) => {
    const form = addItemFormFactory(props); 
    openForm(form);
  }

  const handleEdit = (value) => {
    const form = itemFormFactory(props, value); 
    openForm(form);
  }

  const handleDelete = props.onDelete;

  return [handleAdd, handleEdit, handleDelete];
}