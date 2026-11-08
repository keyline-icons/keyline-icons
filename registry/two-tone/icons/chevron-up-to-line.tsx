import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChevronUpToLine({ size = 24, ...props }: IconProps) {
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
      <path d="M11.3267 10.26C11.7195 9.94 12.3409 9.93 12.707 10.29L18.707 16.29C19.0974 16.68 19.0974 17.32 18.707 17.71C18.3164 18.1 17.6834 18.1 17.2929 17.71L11.9999 12.42L6.707 17.71C6.3164 18.1 5.6834 18.1 5.2929 17.71C4.9024 17.32 4.9024 16.68 5.2929 16.29L11.3267 10.26Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M19 6C19.5523 6 20 6.45 20 7C20 7.55 19.5523 8 19 8H5C4.4477 8 4 7.55 4 7C4 6.45 4.4477 6 5 6H19Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
