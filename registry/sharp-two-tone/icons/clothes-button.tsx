import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ClothesButton({ size = 24, ...props }: IconProps) {
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
      <path d="M19.7782 4.2218C21.7677 6.2114 23 8.9627 23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C15.0373 1 17.7886 2.2323 19.7782 4.2218Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12Z"/>
      <path d="M13.5 8C13.5 8.8284 12.8284 9.5 12 9.5C11.1716 9.5 10.5 8.8284 10.5 8C10.5 7.1716 11.1716 6.5 12 6.5C12.8284 6.5 13.5 7.1716 13.5 8ZM9.5 12C9.5 12.8284 8.8284 13.5 8 13.5C7.1716 13.5 6.5 12.8284 6.5 12C6.5 11.1716 7.1716 10.5 8 10.5C8.8284 10.5 9.5 11.1716 9.5 12ZM17.5 12C17.5 12.8284 16.8284 13.5 16 13.5C15.1716 13.5 14.5 12.8284 14.5 12C14.5 11.1716 15.1716 10.5 16 10.5C16.8284 10.5 17.5 11.1716 17.5 12ZM13.5 16C13.5 16.8284 12.8284 17.5 12 17.5C11.1716 17.5 10.5 16.8284 10.5 16C10.5 15.1716 11.1716 14.5 12 14.5C12.8284 14.5 13.5 15.1716 13.5 16Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
