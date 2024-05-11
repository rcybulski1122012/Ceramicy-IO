from pydantic import BaseModel, ConfigDict


class SchemaBase(BaseModel):
    model_config: ConfigDict = ConfigDict(from_attributes=True)