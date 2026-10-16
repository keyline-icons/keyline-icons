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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 1C17.937 1 23 6.0629 23 12C23 17.937 17.937 23 12 23C6.0629 23 1 17.937 1 12C1 6.0629 6.0629 1 12 1ZM13 14L11 14C8.3346 14 6.1571 16.0856 6 18.7082C7.6501 20.1841 9.7862 21 12 21C14.2138 21 16.3499 20.1841 18 18.7082C17.8419 16.0856 15.6654 14 13 14ZM12 6C10.4812 6 9 7.4812 9 9C9 10.5188 10.4812 12 12 12C13.5188 12 15 10.5188 15 9C15 7.4812 13.5188 6 12 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
