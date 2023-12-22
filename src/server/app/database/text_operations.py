from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.Text import Text, UpdateTextModel


text_collection = Text

class TextOperations:

    async def add_text(new_text: Text) -> Text:
        new_text.id = str(ObjectId())
        text = await new_text.create()
        return text


    async def retrieve_all_texts() -> List[Text]:
        texts = await text_collection.all().to_list()
        return texts

    
    async def retrieve_texts_for_user(user_id) -> List[Text]:
        texts = await text_collection.find(Text.createdByUserId == user_id).to_list()
        return texts


    async def retrieve_text(id: Text) -> Text:
        text = await text_collection.get(str(id))
        if text:
            return text
        

    async def delete_text(id: PydanticObjectId) -> bool:
        try:
            text = await text_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if text:
            await text.delete()
            return True


    async def update_text_data(id: PydanticObjectId, data: dict) -> Union[bool, Text]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        text = await text_collection.get(str(id))
        if text:
            await text.update(update_query)
            return text
        return False

