const fs = require('fs').promises
const { nanoid } = require('nanoid')
const path = require('path')


const contactsPath = path.join(__dirname, 'db', 'contacts.json')

const listContacts = async () => {
	try {
		const contacts = await fs.readFile(contactsPath, { encoding: 'utf-8' })
		return JSON.parse(contacts)
	} catch (error) {
		console.log(`Error: ${error.message}`)
	}
}

const getContactById = async contactId => {
	try {
		const contacts = await listContacts()
		const currentContact = contacts.filter(({ id }) => id === contactId)
		if (currentContact.length > 0){
			return currentContact
		} else {
			return null
		}
	} catch (error) {
		console.log(`Error: ${error.message}`)
	}
}

const removeContact = async contactId => {
	try {
		const contacts = await listContacts()
		const newContacts = contacts.filter(({ id }) => id === contactId)
		if (newContacts.length > 0) {
			const contactsWithoutRemoved = contacts.filter((contact) => contact.id !== contactId);
			await fs.writeFile(contactsPath, JSON.stringify(contactsWithoutRemoved, null, 2), { encoding: 'utf-8' })
			return newContacts;
		} else {
			return null;
		}

		
	} catch (error) {
		console.log(`Error: ${error.message}`)
	}
}

const addContact = async (name, email, phone) => {
    try {
        
		const contacts = await listContacts()
		const newContact = {
			id: nanoid(),
			name,
			email,
			phone,
		}
		const updatedContacts = [newContact, ...contacts]
		await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), { encoding: 'utf-8' })
		return newContact
	} catch (error) {
		console.log(`Error: ${error.message}`)
	}
}

listContacts()

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
}