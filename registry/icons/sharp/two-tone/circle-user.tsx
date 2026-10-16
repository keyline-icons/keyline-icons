import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleUser({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.937 1 23 6.0629 23 12C23 17.937 17.937 23 12 23C6.0629 23 1 17.937 1 12C1 6.0629 6.0629 1 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 2C17.5228 2 22 6.4771 22 12C22 17.5228 17.5228 22 12 22C6.4771 22 2 17.5228 2 12C2 6.4771 6.4771 2 12 2Z"/>
      <path d="M12 6C13.5188 6 15 7.4812 15 9C15 10.5188 13.5188 12 12 12C10.4812 12 9 10.5188 9 9C9 7.4812 10.4812 6 12 6ZM11 14L13 14C15.6654 14 17.8419 16.0856 18 18.7082C16.3499 20.1841 14.2138 21 12 21C9.7862 21 7.6501 20.1841 6 18.7082C6.1571 16.0856 8.3346 14 11 14Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
