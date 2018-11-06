import React, { Component } from 'react';
import './styles/index.css';

import Tree from './Tree';
import leaf from './Nodes/Leaf';
import leafWrapper from './Nodes/LeafWrapper';

let IsNotNullAndHasAny = f => f != null && f.toString().length > 0;
let getNodeState = self => prop => node => self.getState(self.idFnc(node))[prop];

class TreeContainer extends Component {
    state = {
        dummyData: {}
    }
    data = this.props.data;

    componentWillMount = () => {
        if (this.props.getControls) {
            let propFnc = (prop, value) => node => {
                this.getState(this.idFnc(node))[prop] = value;
                return retObj;
            };

            let retObj = {
                getData: () => this.data,
                getState: (prop, id) => this.getState(id)[prop],
                getSelectedNode: () => this.data.find(f => this.drawedData[this.idFnc(f)] && this.drawedData[this.idFnc(f)].selected),
            };

            retObj.openNode = node => { this.openNode(node); return retObj; };
            retObj.closeNode = propFnc('opened', false);
            retObj.enableNode = propFnc('disabled', false);
            retObj.disableNode = propFnc('disabled', true);
            retObj.selectNode = propFnc('selected', true);
            retObj.deselectNode = propFnc('selected', false);
            retObj.clearAllStates = () => { this.drawedData = {}; return retObj; };

            retObj.updateData = data => { this.data = data; return retObj; };
            retObj.redrawTree = () => { this.updateView(); return retObj; };
            retObj.getFilteredAndSortedData = () => this.sortAndFilterNode(this.data);

            retObj.getState = () => {
                var dat = ({ ...this.drawedData });
                for (var key in dat) dat[key] = {...dat[key]};
                return dat;
            };
            retObj.setState = state => { this.drawedData = state; return retObj; };

            this.onNodeClick = node => {
                this.changeAllStates('opened', false)
                    .changeAllStates('selected', false)
                    .openNode(node).selectNode(node)
                    .updateView();
                if (this.props.onNodeClick)
                    this.props.onNodeClick(this.data.find(f => this.idFnc(f) === this.idFnc(node)));
            }
            this.props.getControls(retObj);
        }
    }

    updateView = () => this.setState({ dummyData: {} });

    changeAllStates = (prop, value) => {
        for (let key in this.drawedData)
            this.drawedData[key][prop] = value;
        return this;
    };

    onNodeClick = null;

    openNode = node => {
        if (IsNotNullAndHasAny(node.children))
            this.getState(this.idFnc(node)).opened = true;
        if (node.getParent != null)
            this.openNode(node.getParent());
        return this;
    };

    selectNode = node => {
        this.getState(this.idFnc(node)).selected = true;
        return this;
    };

    onNodeOpenClick = node => {
        if (IsNotNullAndHasAny(node.children)) {
            this.getState(this.idFnc(node)).opened = !this.getState(this.idFnc(node)).opened;
            this.updateView();
        }
    };

    idFnc = this.props.idFnc || (f => f.item.id);
    drawedData = {};
    getState = id => {
        if (this.drawedData[id] == null)
            this.drawedData[id] = { opened: false, selected: false, disabled: false };
        return this.drawedData[id];
    };
    isNodeOpened = getNodeState(this)("opened");
    isNodeSelected = getNodeState(this)("selected");
    isNodeDisabled = getNodeState(this)("disabled");

    sortAndFilterNode = (node) => {
        if (this.props.filterFnc)
            node = this.props.filterFnc(node);
        if (this.props.sortFnc)
            node = this.props.sortFnc(node);
        return node;
    }

    render = () => {
        if (!this.data) return;
        let drawData = this.sortAndFilterNode(this.data);
        return drawData ? <Tree data={drawData}
            isNodeOpened={this.isNodeOpened}
            isNodeSelected={this.isNodeSelected}
            isNodeDisabled={this.isNodeDisabled}
            onNodeClick={this.onNodeClick}
            onNodeOpenClick={this.onNodeOpenClick}
            idFnc={this.idFnc}
            leaf={this.props.leaf} /> : null;
    }
}

export const Leaf = leaf;
export const LeafWrapper = leafWrapper;
export default TreeContainer;