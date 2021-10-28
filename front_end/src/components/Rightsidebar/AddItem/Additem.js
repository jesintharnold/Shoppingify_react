import './Additem.scss';

function Additem(){
    return (
        <div className="Add_item_main">

        <div className="width_form_90">    
        <p>Add a new item</p>

        <form>

        <div className="Name_sec">
        <input type="text" id="name" placeholder="Enter a name"/>
        <label htmlFor="name" className="label_control">Name</label>
        </div>

        <div className="Note_sec">
        <textarea type="text" id="note" placeholder="Enter a note"/>
        <label htmlFor="note" className="label_control">Note (optional)</label>
        </div>

        <div className="URL_sec">
        <input id="image" type="url" placeholder="Enter a url"/>
        <label htmlFor="image">Image (optional)</label>
        </div>

        <div className="category_sec">
        <input id="category" type="text" placeholder="Enter a category"/>
        <label htmlFor="category">Category</label>
        </div>

        </form>
        </div>

        </div>
    )
}


export default Additem;