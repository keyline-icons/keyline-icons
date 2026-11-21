import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Shadows({ size = 24, ...props }: IconProps) {
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
      <path d="M17.652 19C16.351 20.0526 14.752 20.7498 13 20.9434V19H17.652ZM20.484 15C20.233 15.7114 19.897 16.3831 19.484 17H13V15H20.484ZM20.943 11C20.98 11.3282 21 11.6617 21 12C21 12.3383 20.98 12.6718 20.943 13H13V11H20.943ZM19.485 7.001C19.898 7.6178 20.236 8.2887 20.487 9H13V7H19.484L19.485 7.001ZM13 3.0557C14.752 3.2492 16.351 3.9473 17.652 5H13V3.0557Z" fill="currentColor" stroke="none"/>
      <path d="M12 2C6.477 2 2 6.4772 2 12C2 17.5228 6.477 22 12 22M12 2C15.272 2 18.176 3.5711 20.001 6C20.874 7.1628 21.5 8.5222 21.8 10C21.931 10.6462 22 11.3151 22 12C22 12.6849 21.931 13.3538 21.8 14C21.5 15.4777 20.874 16.8372 20.001 18C18.176 20.4289 15.272 22 12 22M12 2V22"/>
    </svg>
  )
}
