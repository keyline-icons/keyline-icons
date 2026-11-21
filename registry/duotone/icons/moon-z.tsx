import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MoonZ({ size = 24, ...props }: IconProps) {
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
      <path d="M3.9289 20.0711C2.1204 18.2625 1 15.7612 1 13C1 7.4771 5.4771 3 11 3C11.5523 3 12 3.4477 12 4C12 4.2271 11.9227 4.4474 11.7809 4.6247C10.061 6.7745 10.2326 9.8738 12.1794 11.8206C14.1262 13.7674 17.2255 13.939 19.3753 12.2191C19.5526 12.0773 19.7729 12 20 12C20.5523 12 21 12.4477 21 13C21 18.5229 16.5229 23 11 23C8.2388 23 5.7375 21.8796 3.9289 20.0711Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 9H17.1466C16.71 9 16.4831 8.4797 16.7802 8.15977L21.7198 2.84023C22.0169 2.5203 21.79 2 21.3534 2H16.5"/>
    </svg>
  )
}
