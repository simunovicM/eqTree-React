import React from 'react';
import Aux from './Auxx';
import Leaf from './Nodes/Leaf';

let getLiClass = (node, isLast, isOpened) => {
    var openCloseClass = node.children && node.children.length > 0 ? (isOpened ? "eqtree-open" : "eqtree-closed") : "eqtree-leaf";
    return "eqtree-node " + openCloseClass + (isLast ? " eqtree-last" : "")
};

let mapNode = (node, isRoot, isNodeOpened, drawFnc, idFnc) => {
    var childs = null;
    if (isNodeOpened(node) && node.children && node.children.length > 0)
        childs =
            <ul className="eqtree-children">
                {node.children.map((f, i) =>
                    <li key={idFnc(f)} className={getLiClass(f, i === node.children.length - 1, isNodeOpened(f))}>{mapNode(f, false, isNodeOpened, drawFnc, idFnc)}</li>)}
            </ul>;

    var ret = <Aux>{drawFnc(node, isRoot)}{childs}</Aux>;
    return ret;
}

const tree = (props) => 
{
    let MyLeaf = props.Leaf || Leaf;
    return <div className="divTree AsideList eqtree-default" style={{ height: '240px' }}>
        <ul className="eqtree-container-ul">
            <li className={(getLiClass(props.data, true, props.IsNodeOpened(props.data)))}>
                {mapNode(props.data, true, props.IsNodeOpened,
                (f, isRoot) =>
                    <MyLeaf key={props.idFnc(f)} {...f.item} isRoot={isRoot}
                        onNodeOpenClick={() => props.OnNodeOpenClick(f)}
                        onNodeClick={() => props.OnNodeClick(f)}
                        isSelected={props.IsNodeSelected(f)}
                        isDisabled={props.IsNodeDisabled(f)}
                        />, props.idFnc)}
            </li>
        </ul>
    </div >;
}
export default tree;