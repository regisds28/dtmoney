import Modal from "react-modal";
import { FormEvent, useState } from "react";
import { Form, TransactionTypeContainer, RadioBox } from "./style";
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { api } from "../../services/api";

interface NewTransactionModalProps{
	isOpen: boolean,
	onRequestClose: () => void;
}

export const NewTransactionModal = ({isOpen, onRequestClose}: NewTransactionModalProps) => {

	const [title, setTitle] = useState('');
	const [type, setType] = useState('deposit');
	const [value, setValue] = useState(0);
	const [category, setCategory] = useState('');
	
	
	function handleCreateNewTransaction(event: FormEvent){
		event.preventDefault();

		const data = {
			title,
			value,
			type,
			category
		}

		api.post('/transactions', data)
	}

	return(
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName="react-modal-overlay"
			className="react-modal-content"
	  	>
			<button type="button" onClick={onRequestClose} className="react-modal-close">
				<img src={closeImg} alt="Fechar modal" />
			</button>
			<Form onSubmit={handleCreateNewTransaction}>
				<h2>Cadastrar transação</h2>
				<input value={title} placeholder="Título" onChange={event => setTitle(event.target.value)}/>
				<input value={value} placeholder="Valor" onChange={event => setValue(Number(event.target.value))}/>
				<TransactionTypeContainer>
					<RadioBox 
						type="button" 
						onClick={() => { setType ('deposit')}}
						isActive={type === 'deposit'}
						activeColor="green"
					>
						<img src={incomeImg} alt="Entrada" />
						<span>Entrada</span>
					</RadioBox>
					<RadioBox 
						type="button" 
						onClick={() => { setType ('withdraw')}} 						
						isActive={type === 'withdraw'}
						activeColor="red"
					>
						<img src={outcomeImg} alt="Saída" />
						<span>Saída</span>
					</RadioBox>
				</TransactionTypeContainer>
				<input value={category} placeholder="Categoria" onChange={event => setCategory(event.target.value)}/>
				<button type="submit">Cadastrar</button>
			</Form>
	  </Modal>
	)
}