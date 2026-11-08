import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GuidepointArrowUp({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M19 13C21.2091 13 23 14.79 23 17C22.9997 19.21 21.2089 21 19 21C17.1364 21 15.5702 19.72 15.126 18H8.874C8.4298 19.72 6.8637 21 5 21C2.791 21 1.0003 19.21 1 17C1 14.79 2.7909 13 5 13C6.8638 13 8.43 14.27 8.874 16H15.126C15.57 14.27 17.1362 13 19 13ZM10.7007 3.68C11.3088 2.77 12.6905 2.77 13.2988 3.68L16.7622 8.7C17.0876 9.22 17.0519 9.84 16.7686 10.29C16.4905 10.72 15.9987 11 15.4492 11H8.5508C8.0013 11 7.5095 10.72 7.2314 10.29C6.948 9.84 6.9126 9.22 7.2383 8.7L10.7007 3.68Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M16 17C16 15.34 17.3432 14 19 14C20.6568 14 22 15.34 22 17C22 18.66 20.6568 20 19 20C17.3432 20 16 18.66 16 17ZM16 17H8M8 17C8 18.66 6.6568 20 5 20C3.3432 20 2 18.66 2 17C2 15.34 3.3432 14 5 14C6.6568 14 8 15.34 8 17ZM8.0732 9.25L11.5228 4.25C11.7338 3.92 12.2662 3.92 12.4772 4.25L15.9268 9.25C16.1361 9.58 15.8716 10 15.4496 10H8.5504C8.1284 10 7.8639 9.58 8.0732 9.25Z"/>
    </svg>
  )
}
