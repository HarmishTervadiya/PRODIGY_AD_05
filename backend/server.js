import Realm from "realm";

const REALM_APP_ID='application-0-eiptcvq'
const MONGO_URI='mongodb+srv://harmishtervadiya:<password>@cluster0.zcuatvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const ToDoItemSchema = {
    name: 'ToDoItem',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', optional: false },
      text: { type: 'string', optional: false },
      completed: { type: 'bool', optional: false },
    },
  };

  async function connectToRealm() {
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();
    try {
      await app.logIn(credentials);
      const config = {
        sync: {
          user: app.currentUser,
          partitionValue: 'default', // Or your custom partition
          schema: [ToDoItemSchema],
        },
      };
      return await Realm.open(config);
    } catch (error) {
      console.error('Failed to connect to Realm:', error);
    }
  }

  async function addToDoItem(text) {
    const realm = await connectToRealm();
    realm.write(() => {
      realm.create(ToDoItemSchema, { id: Math.random().toString(), text, completed: false });
    });
  }
  
  async function getToDoItems() {
    const realm = await connectToRealm();
    return realm.objects('ToDoItem');
  }
  