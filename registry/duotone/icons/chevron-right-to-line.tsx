import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChevronRightToLine({ size = 24, ...props }: IconProps) {
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
      <path d="M16.9999 4C17.5519 4 17.9999 4.45 17.9999 5V19C17.9999 19.55 17.5519 20 16.9999 20C16.4476 20 15.9999 19.55 15.9999 19V5C15.9999 4.45 16.4476 4 16.9999 4ZM6.2929 5.29C6.6834 4.9 7.3165 4.9 7.707 5.29L13.707 11.29C14.097 11.68 14.097 12.32 13.707 12.71L7.707 18.71C7.3165 19.1 6.6834 19.1 6.2929 18.71C5.9024 18.32 5.9024 17.68 6.2929 17.29L11.4443 12.14C11.5222 12.06 11.5222 11.94 11.4443 11.86L6.2929 6.71C5.9024 6.32 5.9024 5.68 6.2929 5.29Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M6.2928 5.29C6.6834 4.9 7.3164 4.9 7.7069 5.29L13.7453 11.33C14.0652 11.72 14.0728 12.34 13.7069 12.71L7.7069 18.71C7.341 19.07 6.7241 19.07 6.3312 18.75C5.9407 18.35 5.9024 17.68 6.2928 17.29L11.4442 12.14C11.5222 12.06 11.522 11.94 11.4442 11.86L6.2928 6.71C5.9023 6.32 5.9024 5.68 6.2928 5.29Z" fill="currentColor"/>
    </svg>
  )
}
