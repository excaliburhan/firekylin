'use strict';
/**
 * relation model
 */
export default class extends think.model.relation {
  /**
   * init
   * @param  {} args []
   * @return {}         []
   */
  init(...args){
    super.init(...args);

    this.relation = {
      post_tag: {
        type: think.model.HAS_MANY,
        fkey: 'tag_id'
      }
    }
  }

  addTag(data){
    return this.where({name: data.name, _logic: 'OR'}).thenAdd(data);
  }

  async saveTag(data){
    let info = await this.where({id: data.id}).find();
    if(think.isEmpty(info)){
      return Promise.reject(new Error('TAG_NOT_EXIST'));
    }

    return this.where({id: data.id}).update(data);
  }
}
