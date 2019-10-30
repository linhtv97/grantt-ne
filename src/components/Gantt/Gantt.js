import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';

export default class Gantt extends Component {

    dataProcessor = null;

    setDay(value) {
        switch (value) {
            case 'Hours':
                gantt.config.scale_unit = 'day';
                gantt.config.date_scale = '%d %M';
                gantt.config.scale_height = 60;
                gantt.config.min_column_width = 30;
                gantt.config.subscales = [
                    { unit: 'hour', step: 1, date: '%H' }
                ];
                break;
            case 'Days':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = 'week';
                gantt.config.date_scale = '#%W';
                gantt.config.subscales = [
                    { unit: 'day', step: 1, date: '%d %M' }
                ];
                gantt.config.scale_height = 60;
                break;
            case 'Months':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = 'month';
                gantt.config.date_scale = '%F';
                gantt.config.scale_height = 60;
                gantt.config.subscales = [
                    { unit: 'week', step: 1, date: '#%W' }
                ];
                break;
            default:
                break;
        }
    }

    componentWillMount() {
        gantt.templates.task_class = (start, end, task) => {
            switch (task.status) {
                case "STATUS_DELAYED":
                    return 'smf production-gantt delay';
                case "STATUS_INPROGRESS":
                    return 'smf produciton-gantt in_progess';
                case "STATUS_DONE":
                    return 'smf production-gantt done';
                default:
                    break;
            }
        };
        gantt.templates.task_text = (start, end, task) => {
            return `
                <div class="gantt_task_left_button"><img src="/arrow-point-to-left.svg"></div>
                <div class="gantt_task_label">${task.product_name}</div>
                <div class="gantt_task_right_button"><img src="/arrow-point-to-right.svg"></div>
            `
        };
    }

    initGanttDataProcessor() {
        const onDataUpdated = this.props.onDataUpdated;
        this.dataProcessor = gantt.createDataProcessor((type, action, item, id) => {
            return new Promise((resolve, reject) => {
                if (onDataUpdated) {
                    onDataUpdated(type, action, item, id);
                }
                return resolve();
            });
        });
    }

    shouldComponentUpdate(nextProps) {
        return this.props.zoom !== nextProps.zoom;
    }

    componentDidUpdate() {
        gantt.render();
    }

    componentDidMount() {
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        // gantt.config.show_grid = false;
        const {tasks} = this.props;
        gantt.init(this.ganttContainer);
        this.initGanttDataProcessor();
        gantt.parse(tasks);
    }

    componentWillUnmount() {
        if (this.dataProcessor) {
            this.dataProcessor.destructor();
            this.dataProcessor = null;
        }
    }

    render() {
        const {zoom} = this.props;
        this.setDay(zoom);
        return (
            <div
                ref={input => this.ganttContainer = input}
                style={{ width: '100%', height: '100%' }}
            />
        );
    }
}
