import React, { Component } from 'react';
import './styles/index.css';

import Tree from './Tree';

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

                var retObj = {
                    GetData: () => this.data,
                    GetState: (prop, id) => this.getState(id)[prop],
                    GetSelectedNode: () => this.sortAndFilterNode(this.data).find(f => this.drawedData[this.idFnc(f)] && this.drawedData[this.idFnc(f)].selected),
                };

                retObj.OpenNode = node => { this.OpenNode(node); return retObj; };
                retObj.CloseNode = propFnc('opened', false);
                retObj.EnableNode = propFnc('disabled', false);
                retObj.DisableNode = propFnc('disabled', true);
                retObj.SelectNode = propFnc('selected', true);
                retObj.DeselectNode = propFnc('selected', false);
                retObj.ClearAllStates = () => { this.drawedData = {}; return retObj; };

                retObj.UpdateData = data => { this.data = data; return retObj; };
                retObj.RedrawTree = () => { this.UpdateView(); return retObj; };

                this.props.getControls(retObj);
            }
        }

        UpdateView = () => this.setState({ dummyData: {} });

        ChangeAllStates = (prop, value) => {
            for (var key in this.drawedData)
                this.drawedData[key][prop] = value;
            return this;
        };

        OnNodeClick = node => this.ChangeAllStates('opened', false)
            .ChangeAllStates('selected', false)
            .OpenNode(node).SelectNode(node)
            .UpdateView();

        OpenNode = node => {
            if (IsNotNullAndHasAny(node.children))
                this.getState(this.idFnc(node)).opened = true;
            if (node.GetParent != null)
                this.OpenNode(node.GetParent());
            return this;
        };

        SelectNode = node => {
            this.getState(this.idFnc(node)).selected = true;
            return this;
        };

        OnNodeOpenClick = node => {
            if (IsNotNullAndHasAny(node.children)) {
                this.getState(this.idFnc(node)).opened = !this.getState(this.idFnc(node)).opened;
                this.UpdateView();
            }
        };

        idFnc = this.props.idFnc || (f => f.item.id);
        drawedData = {};
        getState = id => {
            if (this.drawedData[id] == null)
                this.drawedData[id] = { opened: false, selected: false, disabled: false };
            return this.drawedData[id];
        };
        IsNodeOpened = getNodeState(this)("opened");
        IsNodeSelected = getNodeState(this)("selected");
        IsNodeDisabled = getNodeState(this)("disabled");

        sortAndFilterNode = (node) => {
            if (this.props.filterFnc)
                node = this.props.filterFnc(node);
            if (this.props.sortFnc)
                node = this.props.sortFnc(node);
            return node;
        }

        render = () => {
            var drawData = this.sortAndFilterNode(this.data);
            return drawData ? <Tree data={drawData}
                IsNodeOpened={this.IsNodeOpened}
                IsNodeSelected={this.IsNodeSelected}
                IsNodeDisabled={this.IsNodeDisabled}
                OnNodeClick={this.OnNodeClick}
                OnNodeOpenClick={this.OnNodeOpenClick}
                idFnc={this.idFnc}
                Leaf={this.props.Leaf}/> : null;
        }
    }

export default TreeContainer;