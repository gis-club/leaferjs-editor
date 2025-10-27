import { ref, shallowRef, computed } from 'vue';
import { applyPatches, produceWithPatches, type Patch, enablePatches } from 'immer';

enablePatches();

export function useHistory<T>(baseState: T, max = 10) {
  const undoStack = ref<
    { action: string; patches: Patch[]; inversePatches: Patch[] }[]
  >([]);
  const undoStackPointer = ref(-1);
  const undoable = ref(false);

  const state = shallowRef(baseState);
  const update = (updater: (draft: T) => any, action: string) => {
    const [nextState, patches, inversePatches] = produceWithPatches(state.value, updater) as any;
    state.value = nextState;
    console.log(patches);
    console.log(inversePatches);
    
    if (undoable.value && patches.length && inversePatches.length) {
      const pointer = ++undoStackPointer.value;
      undoStack.value.length = pointer;
      undoStack.value[pointer] = {
        action,
        patches,
        inversePatches,
      };
    }

    if (undoStack.value.length > max) {
      const head = undoStack.value.shift();
      const currentHead = undoStack.value[0];
      if (head && currentHead) {
        currentHead.inversePatches.push(...head.inversePatches);
        currentHead.patches.unshift(...head.patches);
        undoStackPointer.value = max - 1;
      }
    }

    console.log(undoStackPointer.value);
  };

  function enable(value = true) {
    undoable.value = value;
  }

  function undo() {
    if (undoStackPointer.value < 0) return;

    const target = undoStack.value[undoStackPointer.value];
    if (target) {
      const patches = target.inversePatches;
      console.log(patches);
      state.value = applyPatches(state.value, patches);
      undoStackPointer.value--;
      return target.patches
    }
    return []
  }

  function redo() {
    if (undoStackPointer.value === undoStack.value.length - 1) return;
    undoStackPointer.value++;
    const patches = undoStack.value[undoStackPointer.value]?.patches;
    if (patches) {
      state.value = applyPatches(state.value, patches);
    }
  }

  function go(index: number) {
    const res: Patch[] = [];
    if (index === undoStackPointer.value) {
      return;
    } else if (index < undoStackPointer.value) {
      for (let i = index + 1; i <= undoStackPointer.value; i++) {
        const element = undoStack.value[i];
        if (element) res.unshift(...element.inversePatches);
      }
    } else {
      for (let i = undoStackPointer.value + 1; i <= index; i++) {
        const element = undoStack.value[i];
        if (element) res.push(...element.patches);
      }
    }

    state.value = applyPatches(state.value, res);
    undoStackPointer.value = index;
  }

  const isUndoDisable = computed(() => undoStackPointer.value < 0);

  const isRedoDisable = computed(
    () => undoStackPointer.value === undoStack.value.length - 1
  );

  const undoCount = computed(() => undoStackPointer.value + 1);

  const redoCount = computed(
    () => undoStack.value.length - undoStackPointer.value - 1
  );

  return {
    state,
    update,
    undo,
    redo,
    undoStack,
    undoStackPointer,
    go,
    enable,
    isUndoDisable,
    isRedoDisable,
    undoCount,
    redoCount,
  };
}
