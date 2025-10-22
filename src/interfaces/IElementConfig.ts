import type { Component } from "vue"

export interface IElementConfig {
  id: string
  label: string
  component: Component,
  function: Function
}