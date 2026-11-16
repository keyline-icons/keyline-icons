import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleHalfStriped({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 1C15.599 1 18.795 2.73 20.8 5.3994L20.978 5.6416C21.846 6.8654 22.471 8.2756 22.78 9.8008C22.925 10.512 23 11.2479 23 12C23 12.7521 22.925 13.488 22.78 14.1992C22.45 15.826 21.76 17.3219 20.8 18.6006C18.795 21.27 15.599 23 12 23C5.925 23 1 18.0751 1 12C1 5.9249 5.925 1 12 1Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M17.652 19C16.351 20.0526 14.752 20.7498 13 20.9434V19H17.652ZM20.484 15C20.233 15.7114 19.897 16.3831 19.484 17H13V15H20.484ZM20.943 11C20.98 11.3282 21 11.6617 21 12C21 12.3383 20.98 12.6718 20.943 13H13V11H20.943ZM19.485 7.001C19.898 7.6178 20.236 8.2887 20.487 9H13V7H19.484L19.485 7.001ZM13 3.0557C14.752 3.2492 16.351 3.9473 17.652 5H13V3.0557Z" fill="currentColor"/>
    </svg>
  )
}
