import React from 'react';

import Draggable from 'devextreme-react/draggable';
import ScrollView from 'devextreme-react/scroll-view';
import { TaskType } from './SchedulerRoot.types';

type SchedulingItemsPropsType = {
  tasks: TaskType[];
};

export default class SchedulingItems extends React.Component<SchedulingItemsPropsType> {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props) {
    super(props);
  }

  // @ts-ignore
  onListDragStart(e) {
    e.cancel = true;
  }

  // @ts-ignore
  onItemDragStart(e) {
    e.itemData = e.fromData;
  }

  // @ts-ignore
  onItemDragEnd(e) {
    if (e.toData) {
      e.cancel = true;
    }
  }

  render() {
    const { tasks } = this.props;

    return (
      <ScrollView id="scroll">
        <Draggable
          id="list"
          data="dropArea"
          group="appointmentsGroup"
          onDragStart={this.onListDragStart}
        >
          {tasks.map((task) => (
            <Draggable
              key={task.text}
              className="item dx-card dx-theme-text-color dx-theme-background-color"
              clone
              group="appointmentsGroup"
              data={task}
              onDragStart={this.onItemDragStart}
              onDragEnd={this.onItemDragEnd}
            >
              <p>{task.text}</p>
              <p>{task.number}</p>
              <p>{task.address}</p>
            </Draggable>
          ))}
        </Draggable>
      </ScrollView>
    );
  }
}
