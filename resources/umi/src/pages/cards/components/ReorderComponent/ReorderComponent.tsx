import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// a little function to help us with reordering the result
const reorder = (list:Array<object>, startIndex:number, endIndex:number):Array<object> => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, id = null) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `4px 4px ${grid}px 4px`,
    borderRadius: '5px',
    // change background colour if dragging
    background: isDragging ? "#0094C6" : (id ? "EBF0F7" : "#bfd4f2"),
    color: isDragging ? "#fff" : "#50719D",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver:boolean) => ({
    background: isDraggingOver ? '#dbe4f5' : '',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});
interface Props {
    undraggables: Array<object>;
    draggables: Array<object>; 
    setValue: (fieldName:string,index:number) => void   
}
interface State {
    items: Array<object>;
}
interface Result {
    source: {
        index: number;
    };
    destination: {
        index: number;
    }
}
class ReorderComponent extends Component<Props,State> {
    state = {
        items: [
            ...this.props.undraggables,
            ...this.props.draggables,
        ]
    }
    onDragEnd = (result:Result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );
        this.props.setValue('order', result.destination.index+1)
        this.setState({
            items: items,
        });
    }
    componentDidMount(){
        this.props.setValue('order',this.state.items.length)
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided:any, snapshot:any) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.state.items.map((item, index) => (
                                <Draggable isDragDisabled={item.id ? true : false} key={item.id || 'target'} draggableId={item.id || 'target'} index={index}>
                                    {(provided: any, snapshot: any) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style,
                                                item.id,
                                            )}
                                        >
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

// Put the thing into the DOM!
export default ReorderComponent
