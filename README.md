#React-easy-tooltip
For add tooltip in your app, you can use this easy library.
 
For first, you should connect it. For connect this library to your application,
 you can use `useTooltip` or `withTooltip`.
 ---
This libraries has the same approach and options to work flow.
Options:
* className -  Add the className to your tooltips.
* children - You can throw own children to render your application.
 (This is a function what will throw rendered component 
 by props get options and targeted element, something like this `( options, element) => Component`).
* to - render tooltip as link with href to the link.
* type - type of tooltip (add className of selected type)
Methods:
* onAppear - `(options, target) => Nothing`
* onDisappear - `(options, target) => Nothing`
---
However, for create individual classNae or title,
 You can use data attributes to your element :
* data-tooltip-title -  Add the title in your tooltips.
* data-tooltip-class-name - Add the className to your tooltips.
* data-tooltip-type - type of tooltip (add className of selected type)
