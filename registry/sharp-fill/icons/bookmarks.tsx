import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bookmarks({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 6L16 6C16.5523 6 17 6.4477 17 7L17 21.2488C17 21.3909 16.9697 21.5314 16.9111 21.6609L16.5713 22.4121C16.4094 22.77 16.053 23 15.6602 23C15.6114 23 15.5626 22.9964 15.5143 22.9893L14.6985 22.869C14.5861 22.8524 14.4772 22.8168 14.3768 22.7636L10.1407 20.5225C10.1157 20.5093 10.0912 20.495 10.0674 20.4797L10 20.4364L9.9324 20.4798C9.9087 20.4951 9.8843 20.5093 9.8593 20.5225L5.6232 22.7636C5.5228 22.8168 5.4139 22.8524 5.3015 22.869L4.4857 22.9893C4.4374 22.9964 4.3886 23 4.3398 23C3.947 23 3.5906 22.77 3.4287 22.4121L3.0889 21.6609C3.0303 21.5314 3 21.3909 3 21.2488L3 7C3 6.4477 3.4477 6 4 6Z" fill="currentColor" stroke="none"/>
      <path d="M20 18.1987L20 2L8.8455 2L7.9792 3.4998" fill="none"/>
    </svg>
  )
}
