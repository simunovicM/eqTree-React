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
                    <li key={idFnc(f)}
                        className={[getLiClass(f, i === node.children.length - 1, isNodeOpened(f)), f.item.class ? f.item.class : ''].join(' ')}>
                        {mapNode(f, false, isNodeOpened, drawFnc, idFnc)}
                    </li>)}
            </ul>;

    var ret = <Aux>{drawFnc(node, isRoot)}{childs}</Aux>;
    return ret;
}

const tree = (props) => {
    return <div className="eqtree-default">
        <ul className="eqtree-container-ul">
            <li className={[(getLiClass(props.data, true, props.isNodeOpened(props.data))), props.data.item.class ? props.data.item.class : ''].join(' ')}>
                {mapNode(props.data, true, props.isNodeOpened,
                    (f, isRoot) => {
                        let MyLeaf = f.item.Leaf || props.Leaf || Leaf;
                        return (<MyLeaf key={f.id} {...f.item} isRoot={isRoot}
                            onNodeOpenClick={() => props.onNodeOpenClick(f)}
                            onNodeClick={() => props.onNodeClick(f)}
                            isSelected={props.isNodeSelected(f)}
                            isDisabled={props.isNodeDisabled(f)}
                        />)
                    }, props.idFnc)}
            </li>
        </ul>
    </div >;
}
export default tree;