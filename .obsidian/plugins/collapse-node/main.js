/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// canvasCollapseIndex.ts
var canvasCollapseIndex_exports = {};
__export(canvasCollapseIndex_exports, {
  default: () => CanvasCollapsePlugin
});
module.exports = __toCommonJS(canvasCollapseIndex_exports);
var import_obsidian3 = require("obsidian");

// node_modules/monkey-around/mjs/index.js
function around(obj, factories) {
  const removers = Object.keys(factories).map((key) => around1(obj, key, factories[key]));
  return removers.length === 1 ? removers[0] : function() {
    removers.forEach((r) => r());
  };
}
function around1(obj, method, createWrapper) {
  const original = obj[method], hadOwn = obj.hasOwnProperty(method);
  let current = createWrapper(original);
  if (original)
    Object.setPrototypeOf(current, original);
  Object.setPrototypeOf(wrapper, current);
  obj[method] = wrapper;
  return remove;
  function wrapper(...args) {
    if (current === original && obj[method] === wrapper)
      remove();
    return current.apply(this, args);
  }
  function remove() {
    if (obj[method] === wrapper) {
      if (hadOwn)
        obj[method] = original;
      else
        delete obj[method];
    }
    if (current === original)
      return;
    current = original;
    Object.setPrototypeOf(wrapper, original || Function);
  }
}

// ControlHeader.ts
var import_obsidian = require("obsidian");
var CollapseControlHeader = class extends import_obsidian.Component {
  constructor(node) {
    super();
    this.collapsed = false;
    this.content = "";
    this.refreshed = false;
    this.containingNodes = [];
    this.node = node;
    this.collapsed = node.unknownData.collapsed === void 0 ? false : node.unknownData.collapsed;
  }
  onload() {
    this.initHeader();
    this.initContent();
    this.initTypeIcon();
    this.updateNodesInGroup();
    this.updateNode();
    return this.headerEl;
  }
  onunload() {
    super.onunload();
    this.headerEl.empty();
    this.headerEl.detach();
  }
  initHeader() {
    this.headerEl = createEl("div", {
      cls: "canvas-node-collapse-control"
    });
    this.registerDomEvent(this.headerEl, "click", async (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      await this.toggleCollapsed();
    });
    this.collapsedIconEl = this.headerEl.createEl("div", {
      cls: "canvas-node-collapse-control-icon"
    });
    this.typeIconEl = this.headerEl.createEl("div", {
      cls: "canvas-node-type-icon"
    });
    this.titleEl = this.headerEl.createEl("span", {
      cls: "canvas-node-collapse-control-title"
    });
  }
  checkNodeType() {
    return this.node.unknownData.type;
  }
  initTypeIcon() {
    this.setIconOrContent("setIcon");
  }
  initContent() {
    this.setIconOrContent("setContent");
    this.titleEl.setText(this.content);
  }
  setIconOrContent(action) {
    var _a;
    const currentType = this.checkNodeType();
    switch (currentType) {
      case "text":
        if (action === "setIcon")
          (0, import_obsidian.setIcon)(this.typeIconEl, "sticky-note");
        if (action === "setContent")
          this.content = this.node.text.slice(0, 10) + (this.node.text.length > 10 ? "..." : "");
        break;
      case "file":
        if (action === "setIcon") {
          if (this.node.file.name.split(".")[1].trim() === "md")
            (0, import_obsidian.setIcon)(this.typeIconEl, "file-text");
          else
            (0, import_obsidian.setIcon)(this.typeIconEl, "file-image");
        }
        if (action === "setContent")
          this.content = (_a = this.node.file) == null ? void 0 : _a.name.split(".")[0];
        break;
      case "group":
        if (action === "setIcon")
          (0, import_obsidian.setIcon)(this.typeIconEl, "create-group");
        if (action === "setContent")
          this.content = "";
        break;
      case "link":
        if (action === "setIcon")
          (0, import_obsidian.setIcon)(this.typeIconEl, "link");
        if (action === "setContent")
          this.content = this.node.url;
        break;
    }
    if (action === "setIcon" && !this.node.unknownData.type) {
      (0, import_obsidian.setIcon)(this.typeIconEl, "sticky-note");
    }
  }
  setCollapsed(collapsed) {
    if (this.node.canvas.readonly)
      return;
    if (this.collapsed === collapsed)
      return;
    this.collapsed = collapsed;
    this.node.unknownData.collapsed = collapsed;
    this.updateNodesInGroup();
    this.updateNode();
    this.updateEdges();
  }
  refreshHistory() {
    if (this.refreshed)
      return;
    const history = this.node.canvas.history;
    if (!history || history.data.length === 0)
      return;
    history.data.forEach((data) => {
      data.nodes.forEach((node) => {
        if (node.id === this.node.id && (node == null ? void 0 : node.collapsed) === void 0) {
          node.collapsed = false;
        }
      });
    });
    this.refreshed = true;
  }
  async toggleCollapsed() {
    if (this.node.canvas.readonly)
      return;
    this.collapsed = !this.collapsed;
    this.node.unknownData.collapsed = !this.collapsed;
    this.node.canvas.requestSave(false, true);
    const canvasCurrentData = this.node.canvas.getData();
    const nodeData = canvasCurrentData.nodes.find((node) => node.id === this.node.id);
    if (nodeData) {
      nodeData.collapsed = this.collapsed;
      this.refreshHistory();
    }
    setTimeout(() => {
      this.node.canvas.setData(canvasCurrentData);
      this.node.canvas.requestSave(true);
    }, 0);
    this.updateNodesInGroup();
    this.updateNode();
    this.updateEdges();
  }
  updateNode() {
    this.node.nodeEl.toggleClass("collapsed", this.collapsed);
    (0, import_obsidian.setIcon)(this.collapsedIconEl, this.collapsed ? "chevron-right" : "chevron-down");
  }
  updateEdges() {
    this.node.canvas.nodeInteractionLayer.interactionEl.detach();
    this.node.canvas.nodeInteractionLayer.render();
    const edges = this.node.canvas.getEdgesForNode(this.node);
    edges.forEach((edge) => {
      edge.render();
    });
  }
  updateNodesInGroup(expandAll) {
    if (this.node.unknownData.type === "group" || this.node.label) {
      const nodes = this.node.canvas.getContainingNodes(this.node.getBBox(true));
      if (expandAll) {
        this.collapsed = false;
      }
      if (this.collapsed) {
        nodes.filter((node) => node.id !== this.node.id).forEach((node) => {
          this.containingNodes.push(node);
          node.nodeEl.toggleClass("group-nodes-collapsed", this.collapsed);
          this.updateEdgesInGroup(node);
        });
      } else {
        const otherGroupNodes = nodes.filter((node) => node.id !== this.node.id && node.unknownData.type === "group" && node.unknownData.collapsed);
        const ignoreNodes = [];
        for (const groupNode of otherGroupNodes) {
          const bbox = groupNode.getBBox(true);
          const nodesInGroup = this.node.canvas.getContainingNodes(bbox);
          nodesInGroup.forEach((childNode) => {
            if (childNode.id !== groupNode.id) {
              ignoreNodes.push(childNode);
            }
          });
        }
        this.containingNodes.filter((t) => !ignoreNodes.find((k) => k.id === t.id)).forEach((node) => {
          node.nodeEl.toggleClass("group-nodes-collapsed", this.collapsed);
          this.updateEdgesInGroup(node);
        });
        ignoreNodes.forEach((node) => {
          this.updateEdgesInGroup(node, node.unknownData.collapsed);
        });
        this.containingNodes = [];
      }
      this.updateEdges();
    }
  }
  updateEdgesInGroup(node, triggerCollapsed) {
    const edges = this.node.canvas.getEdgesForNode(node);
    edges.forEach((edge) => {
      var _a, _b;
      edge.lineGroupEl.classList.toggle("group-edges-collapsed", triggerCollapsed || this.collapsed);
      (_a = edge.lineEndGroupEl) == null ? void 0 : _a.classList.toggle("group-edges-collapsed", triggerCollapsed || this.collapsed);
      (_b = edge.lineStartGroupEl) == null ? void 0 : _b.classList.toggle("group-edges-collapsed", triggerCollapsed || this.collapsed);
    });
  }
};

// utils.ts
var import_obsidian2 = require("obsidian");
var getBoundingRect = (nodes) => {
  const bboxArray = nodes.map((t) => t.getBBox());
  const minX = Math.min(...bboxArray.map((t) => t.minX));
  const minY = Math.min(...bboxArray.map((t) => t.minY));
  const maxX = Math.max(...bboxArray.map((t) => t.maxX));
  const maxY = Math.max(...bboxArray.map((t) => t.maxY));
  return {
    minX,
    minY,
    maxX,
    maxY
  };
};
var updateSelection = (canvas) => {
  if (canvas.menu.selection.bbox) {
    const selection = Array.from(canvas.selection);
    const currentNodesInSelection = canvas.getContainingNodes(canvas.menu.selection.bbox);
    if (currentNodesInSelection.length > 0) {
      const boundingRect = getBoundingRect(selection.length > currentNodesInSelection.length ? selection : currentNodesInSelection);
      if (boundingRect) {
        canvas.menu.selection.update(boundingRect);
      }
    }
  }
};
var handleMultiNodes = (canvas, allNodes, collapse) => {
  var _a;
  const nodes = allNodes ? Array.from(canvas.nodes.values()) : Array.from(canvas.selection);
  const canvasData = canvas.getData();
  if (nodes && nodes.length > 0) {
    for (const node of nodes) {
      if (node.unknownData.type === "group") {
        node.headerComponent.updateNodesInGroup(collapse);
      }
      (_a = node.headerComponent) == null ? void 0 : _a.setCollapsed(collapse);
      const nodeData = canvasData.nodes.find((t) => t.id === node.id);
      if (nodeData)
        nodeData.collapsed = collapse;
    }
    canvas.setData(canvasData);
  }
  canvas.requestSave(true, true);
  canvas.requestFrame();
  updateSelection(canvas);
};
var handleMultiNodesViaNodes = (canvas, nodes, collapse) => {
  var _a;
  const canvasData = canvas.getData();
  if (nodes && nodes.length > 0) {
    for (const node of nodes) {
      if (node.unknownData.type === "group") {
        node.headerComponent.updateNodesInGroup(collapse);
      }
      (_a = node.headerComponent) == null ? void 0 : _a.setCollapsed(collapse);
      const nodeData = canvasData.nodes.find((t) => t.id === node.id);
      if (nodeData)
        nodeData.collapsed = collapse;
    }
    canvas.setData(canvasData);
  }
  canvas.requestSave(true, true);
  updateSelection(canvas);
};
var handleSingleNode = (node, collapse) => {
  if (node.unknownData.type === "group") {
    node.headerComponent.updateNodesInGroup();
  }
  const canvasData = node.canvas.getData();
  const nodeData = canvasData.nodes.find((t) => t.id === node.id);
  if (nodeData)
    nodeData.collapsed = collapse;
  node.canvas.setData(canvasData);
  node.canvas.requestSave(true, true);
  updateSelection(node.canvas);
};
var handleNodesViaCommands = (plugin, checking, allNodes, collapse) => {
  plugin.triggerByPlugin = true;
  const currentView = plugin.app.workspace.getActiveViewOfType(import_obsidian2.ItemView);
  if (currentView && currentView.getViewType() === "canvas") {
    if (!checking) {
      const canvasView = currentView;
      const canvas = canvasView.canvas;
      handleMultiNodes(canvas, allNodes, collapse);
    }
    return true;
  }
};
var createHandleContextMenu = (section, callback) => {
  return (menu) => {
    menu.addItem((item) => {
      const subMenu = item.setSection(section).setTitle("Canvas Collapse").setIcon("chevrons-left-right").setSubmenu();
      handleCanvasMenu(subMenu, callback);
    });
  };
};
var handleCanvasMenu = (subMenu, callback) => {
  return subMenu.addItem((item) => {
    item.setIcon("fold-vertical").setTitle("Fold Selected Nodes").onClick(async () => {
      await callback(true);
    });
  }).addItem((item) => {
    item.setIcon("unfold-vertical").setTitle("Expand Selected Nodes").onClick(async () => {
      await callback(false);
    });
  });
};
var handleSelectionContextMenu = (plugin, menu, canvas) => {
  plugin.triggerByPlugin = true;
  const callback = async (isFold) => {
    handleMultiNodes(canvas, false, isFold);
  };
  createHandleContextMenu("action", callback)(menu);
};
var handleNodeContextMenu = (plugin, menu, node) => {
  plugin.triggerByPlugin = true;
  const callback = async (isFold) => {
    handleSingleNode(node, isFold);
  };
  createHandleContextMenu("canvas", callback)(menu);
};
var refreshAllCanvasView = (app) => {
  const cavasLeaves = app.workspace.getLeavesOfType("canvas");
  if (!cavasLeaves || cavasLeaves.length === 0)
    return;
  for (const leaf of cavasLeaves) {
    leaf.rebuildView();
  }
};
var getSelectionCoords = (dom) => {
  const domHTML = dom.outerHTML;
  const translateRegex = /translate\((-?\d+\.?\d*)px, (-?\d+\.?\d*)px\)/;
  const sizeRegex = /width: (\d+\.?\d*)px; height: (\d+\.?\d*)px;/;
  const translateMatches = domHTML.match(translateRegex);
  const sizeMatches = domHTML.match(sizeRegex);
  if (translateMatches && sizeMatches) {
    const x = parseFloat(translateMatches[1]);
    const y = parseFloat(translateMatches[2]);
    const width = parseFloat(sizeMatches[1]);
    const height = parseFloat(sizeMatches[2]);
    return {
      minX: x,
      minY: y,
      maxX: x + width,
      maxY: y + height
    };
  }
};

// canvasCollapseIndex.ts
var CanvasCollapsePlugin = class extends import_obsidian3.Plugin {
  constructor() {
    super(...arguments);
    this.triggerByPlugin = false;
    this.patchSucceed = false;
  }
  async onload() {
    this.registerCommands();
    this.registerCanvasEvents();
    this.registerCustomIcons();
    this.patchCanvas();
    this.patchCanvasMenu();
    this.patchCanvasInteraction();
    this.patchCanvasNode();
  }
  onunload() {
    console.log("unloading plugin");
    refreshAllCanvasView(this.app);
  }
  registerCommands() {
    this.addCommand({
      id: "fold-all-nodes",
      name: "Fold All Nodes",
      checkCallback: (checking) => handleNodesViaCommands(this, checking, true, true)
    });
    this.addCommand({
      id: "expand-all-nodes",
      name: "Expand All Nodes",
      checkCallback: (checking) => handleNodesViaCommands(this, checking, true, false)
    });
    this.addCommand({
      id: "fold-selected-nodes",
      name: "Fold Selected Nodes",
      checkCallback: (checking) => handleNodesViaCommands(this, checking, false, true)
    });
    this.addCommand({
      id: "expand-selected-nodes",
      name: "Expand Selected Nodes",
      checkCallback: (checking) => handleNodesViaCommands(this, checking, false, false)
    });
  }
  registerCanvasEvents() {
    this.app.workspace.on("collapse-node:patched-canvas", () => {
      refreshAllCanvasView(this.app);
    });
    this.app.workspace.on("canvas:selection-menu", (menu, canvas) => {
      handleSelectionContextMenu(this, menu, canvas);
    });
    this.app.workspace.on("canvas:node-menu", (menu, node) => {
      handleNodeContextMenu(this, menu, node);
    });
  }
  registerCustomIcons() {
    (0, import_obsidian3.addIcon)("fold-vertical", `<g id="surface1"><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 12 22.000312 L 12 16.000312 " transform="matrix(4.166667,0,0,4.166667,0,0)"/><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 12 7.999687 L 12 1.999687 " transform="matrix(4.166667,0,0,4.166667,0,0)"/><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 4.000312 12 L 1.999687 12 " transform="matrix(4.166667,0,0,4.166667,0,0)"/><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 10.000312 12 L 7.999687 12 " transform="matrix(4.166667,0,0,4.166667,0,0)"/><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 16.000312 12 L 13.999688 12 " transform="matrix(4.166667,0,0,4.166667,0,0)"/><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 22.000312 12 L 19.999688 12 " transform="matrix(4.166667,0,0,4.166667,0,0)"/><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 15 19.000312 L 12 16.000312 L 9 19.000312 " transform="matrix(4.166667,0,0,4.166667,0,0)"/><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 15 4.999687 L 12 7.999687 L 9 4.999687 " transform="matrix(4.166667,0,0,4.166667,0,0)"/></g>`);
    (0, import_obsidian3.addIcon)("unfold-vertical", `<g id="surface1"><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 12 22.000312 L 12 16.000312 " transform="matrix(4.166667,0,0,4.166667,0,0)"/><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 12 7.999687 L 12 1.999687 " transform="matrix(4.166667,0,0,4.166667,0,0)"/><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 4.000312 12 L 1.999687 12 " transform="matrix(4.166667,0,0,4.166667,0,0)"/><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 10.000312 12 L 7.999687 12 " transform="matrix(4.166667,0,0,4.166667,0,0)"/><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 16.000312 12 L 13.999688 12 " transform="matrix(4.166667,0,0,4.166667,0,0)"/><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 22.000312 12 L 19.999688 12 " transform="matrix(4.166667,0,0,4.166667,0,0)"/><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 15 19.000312 L 12 22.000312 L 9 19.000312 " transform="matrix(4.166667,0,0,4.166667,0,0)"/><path style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 15 4.999687 L 12 1.999687 L 9 4.999687 " transform="matrix(4.166667,0,0,4.166667,0,0)"/></g>`);
  }
  patchCanvas() {
    const checkCoords = (e, t) => {
      return e.minX <= t.minX && e.minY <= t.minY && e.maxX >= t.maxX && e.maxY >= t.maxY;
    };
    const checkTriggerByPlugin = () => {
      return this.triggerByPlugin;
    };
    const toggleTriggerByPlugin = () => {
      this.triggerByPlugin = !this.triggerByPlugin;
    };
    const patchCanvas = () => {
      var _a;
      const canvasView = (_a = this.app.workspace.getLeavesOfType("canvas").first()) == null ? void 0 : _a.view;
      if (!canvasView)
        return false;
      const canvas = canvasView == null ? void 0 : canvasView.canvas;
      if (!canvas)
        return false;
      const uninstaller = around(canvas.constructor.prototype, {
        getContainingNodes: (next) => function(e) {
          const result = next.call(this, e);
          const checkExistGroupNode = this.nodeIndex.search(e).find((t) => t.unknownData.type === "group" || t.label);
          if (!checkExistGroupNode)
            return result;
          const renewCoords = checkExistGroupNode == null ? void 0 : checkExistGroupNode.getBBox(true);
          if (renewCoords !== e && e.maxY - e.minY === 40) {
            const newResult = this.nodeIndex.search(renewCoords).filter((t) => {
              return checkCoords(renewCoords, t.getBBox(true));
            });
            if (newResult.length > result.length) {
              return newResult;
            }
          }
          return result;
        },
        requestSave: (next) => function(args, triggerBySelf) {
          next.call(this, args);
          if (triggerBySelf) {
            if (args !== void 0) {
              this.data = this.getData();
              args && this.requestPushHistory(this.data);
            }
          }
        },
        pushHistory: (next) => function(args) {
          if (checkTriggerByPlugin()) {
            toggleTriggerByPlugin();
            return;
          }
          return next.call(this, args);
        },
        selectAll: (next) => function(e) {
          if (this.wrapperEl.querySelector(".canvas-selection")) {
            const domCoords = getSelectionCoords(this.wrapperEl.querySelector(".canvas-selection"));
            if (domCoords) {
              const newResult = Array.from(e).filter((t) => {
                if (!t.unknownData.collapsed)
                  return true;
                if (t.nodeEl.hasClass("group-nodes-collapsed"))
                  return false;
                return checkCoords(domCoords, t.getBBox());
              });
              if (newResult.length > 0) {
                const ne = new Set(newResult);
                return next.call(this, ne);
              }
              if (newResult.length === 0) {
                return;
              }
            }
          }
          return next.call(this, e);
        },
        createTextNode: (next) => function(args) {
          var _a2, _b, _c, _d;
          if (args.size === void 0 && args.pos) {
            return next.call(this, {
              ...args,
              pos: {
                x: args.pos.x,
                y: args.pos.y,
                width: ((_a2 = args == null ? void 0 : args.size) == null ? void 0 : _a2.width) || 250,
                height: ((_b = args == null ? void 0 : args.size) == null ? void 0 : _b.height) || 140
              },
              size: {
                x: args.pos.x,
                y: args.pos.y,
                width: ((_c = args == null ? void 0 : args.size) == null ? void 0 : _c.width) || 250,
                height: ((_d = args == null ? void 0 : args.size) == null ? void 0 : _d.height) || 140
              }
            });
          }
          return next.call(this, args);
        },
        createGroupNode: (next) => function(args) {
          var _a2, _b, _c, _d;
          if (args.size !== void 0 && args.pos) {
            return next.call(this, {
              ...args,
              pos: {
                x: args.pos.x,
                y: args.pos.y - 30,
                width: (_a2 = args == null ? void 0 : args.size) == null ? void 0 : _a2.width,
                height: ((_b = args == null ? void 0 : args.size) == null ? void 0 : _b.height) + 30
              },
              size: {
                x: args.pos.x,
                y: args.pos.y - 30,
                width: (_c = args == null ? void 0 : args.size) == null ? void 0 : _c.width,
                height: ((_d = args == null ? void 0 : args.size) == null ? void 0 : _d.height) + 30
              }
            });
          }
          return next.call(this, args);
        }
      });
      this.register(uninstaller);
      this.patchSucceed = true;
      console.log("Obsidian-Collapse-Node: canvas patched");
      return true;
    };
    this.app.workspace.onLayoutReady(() => {
      if (!patchCanvas()) {
        const evt = this.app.workspace.on("layout-change", () => {
          patchCanvas() && this.app.workspace.offref(evt);
        });
        this.registerEvent(evt);
      }
    });
  }
  patchCanvasMenu() {
    const triggerPlugin = () => {
      this.triggerByPlugin = true;
    };
    const patchMenu = () => {
      var _a;
      const canvasView = (_a = this.app.workspace.getLeavesOfType("canvas").first()) == null ? void 0 : _a.view;
      if (!canvasView)
        return false;
      const menu = canvasView == null ? void 0 : canvasView.canvas.menu;
      if (!menu)
        return false;
      const selection = menu.selection;
      if (!selection)
        return false;
      const menuUninstaller = around(menu.constructor.prototype, {
        render: (next) => function(...args) {
          const result = next.call(this, ...args);
          if (this.menuEl.querySelector(".collapse-node-menu-item"))
            return result;
          const buttonEl = createEl("button", "clickable-icon collapse-node-menu-item");
          (0, import_obsidian3.setTooltip)(buttonEl, "Fold Selected Nodes", {
            placement: "top"
          });
          (0, import_obsidian3.setIcon)(buttonEl, "lucide-chevrons-left-right");
          this.menuEl.appendChild(buttonEl);
          buttonEl.addEventListener("click", () => {
            const pos = buttonEl.getBoundingClientRect();
            if (!buttonEl.hasClass("has-active-menu")) {
              buttonEl.toggleClass("has-active-menu", true);
              const menu2 = new import_obsidian3.Menu();
              const containingNodes = this.canvas.getContainingNodes(this.selection.bbox);
              handleCanvasMenu(menu2, async (isFold) => {
                var _a2;
                triggerPlugin();
                const currentSelection = this.canvas.selection;
                containingNodes.length > 1 ? handleMultiNodesViaNodes(this.canvas, containingNodes, isFold) : currentSelection ? handleSingleNode((_a2 = Array.from(currentSelection)) == null ? void 0 : _a2.first(), isFold) : "";
                buttonEl.toggleClass("has-active-menu", false);
              });
              menu2.setParentElement(this.menuEl).showAtPosition({
                x: pos.x,
                y: pos.bottom,
                width: pos.width,
                overlap: true
              });
            }
          });
          return result;
        }
      });
      this.register(menuUninstaller);
      this.app.workspace.trigger("collapse-node:patched-canvas");
      console.log("Obsidian-Collapse-Node: canvas history patched");
      return true;
    };
    this.app.workspace.onLayoutReady(() => {
      if (!patchMenu()) {
        const evt = this.app.workspace.on("layout-change", () => {
          patchMenu() && this.app.workspace.offref(evt);
        });
        this.registerEvent(evt);
      }
    });
  }
  patchCanvasInteraction() {
    const patchInteraction = () => {
      var _a;
      const canvasView = (_a = this.app.workspace.getLeavesOfType("canvas").first()) == null ? void 0 : _a.view;
      if (!canvasView)
        return false;
      const canvas = canvasView == null ? void 0 : canvasView.canvas.nodeInteractionLayer;
      if (!canvas)
        return false;
      const uninstaller = around(canvas.constructor.prototype, {
        render: (next) => function(...args) {
          const result = next.call(this, ...args);
          if (!this.target)
            return result;
          const isCollapsed = this.target.nodeEl.hasClass("collapsed");
          const isGroupNodesCollapsed = this.target.nodeEl.hasClass("group-nodes-collapsed");
          if (this.target.unknownData) {
            this.interactionEl.toggleClass("collapsed-interaction", isCollapsed);
          }
          this.interactionEl.toggleClass("group-nodes-collapsed", isGroupNodesCollapsed);
          return result;
        }
      });
      this.register(uninstaller);
      console.log("Obsidian-Collapse-Node: canvas history patched");
      return true;
    };
    this.app.workspace.onLayoutReady(() => {
      if (!patchInteraction()) {
        const evt = this.app.workspace.on("layout-change", () => {
          patchInteraction() && this.app.workspace.offref(evt);
        });
        this.registerEvent(evt);
      }
    });
  }
  patchCanvasNode() {
    const initControlHeader = (node) => {
      return new CollapseControlHeader(node);
    };
    const patchNode = () => {
      var _a, _b;
      const canvasView = (_a = this.app.workspace.getLeavesOfType("canvas").first()) == null ? void 0 : _a.view;
      if (!canvasView)
        return false;
      const canvas = canvasView == null ? void 0 : canvasView.canvas;
      if (!canvas)
        return false;
      const node = ((_b = this.app.workspace.getLeavesOfType("canvas").first()) == null ? void 0 : _b.view).canvas.nodes.values().next().value;
      if (!node)
        return false;
      let prototype = Object.getPrototypeOf(node);
      while (prototype && prototype !== Object.prototype) {
        prototype = Object.getPrototypeOf(prototype);
        if (prototype.renderZIndex) {
          break;
        }
      }
      if (!prototype)
        return false;
      const uninstaller = around(prototype, {
        render: (next) => function(...args) {
          const result = next.call(this, ...args);
          if (this.nodeEl.querySelector(".canvas-node-collapse-control"))
            return result;
          this.headerComponent = initControlHeader(this);
          this.containerEl.prepend(this.headerComponent.onload());
          if (this.unknownData.collapsed) {
            this.nodeEl.classList.add("collapsed");
            this.headerComponent.updateEdges();
          }
          return result;
        },
        getBBox: (next) => function(containing) {
          const result = next.call(this);
          if (containing !== true && this.nodeEl.hasClass("collapsed")) {
            const x = this.x;
            const y = this.y;
            const width = this.width;
            const height = 40;
            return {
              minX: x,
              minY: y,
              maxX: x + width,
              maxY: y + height
            };
          }
          return result;
        },
        setData: (next) => function(data) {
          var _a2;
          if (data.collapsed !== void 0) {
            (_a2 = this.headerComponent) == null ? void 0 : _a2.setCollapsed(data.collapsed);
          }
          return next.call(this, data);
        }
      });
      this.register(uninstaller);
      console.log("Obsidian-Collapse-Node: canvas node patched");
      return true;
    };
    this.app.workspace.onLayoutReady(() => {
      if (!patchNode()) {
        const evt = this.app.workspace.on("layout-change", () => {
          patchNode() && this.app.workspace.offref(evt);
        });
        this.registerEvent(evt);
      }
    });
  }
};
