import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Radicand({ size = 24, ...props }: IconProps) {
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
      <path d="M22 3C22.5523 3 23 3.45 23 4C23 4.55 22.5523 5 22 5H14.7813L11.1709 19.48C10.7114 21.33 8.1809 21.55 7.4043 19.82L4.5704 13.49L2.5547 14.83C2.0952 15.14 1.4744 15.01 1.168 14.55C0.8617 14.1 0.9859 13.47 1.4454 13.17L3.461 11.82C4.4904 11.14 5.8899 11.54 6.3956 12.67L9.2295 19L12.8409 4.52C13.063 3.63 13.8631 3 14.7813 3H22Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M21.2929 11.29C21.6834 10.9 22.3164 10.9 22.707 11.29C23.0974 11.68 23.0975 12.32 22.707 12.71L20.414 15L22.707 17.29C23.0974 17.68 23.0975 18.32 22.707 18.71C22.3165 19.1 21.6834 19.1 21.2929 18.71L18.9999 16.41L16.707 18.71C16.3165 19.1 15.6834 19.1 15.2929 18.71C14.9024 18.32 14.9024 17.68 15.2929 17.29L17.5859 15L15.2929 12.71C14.9024 12.32 14.9024 11.68 15.2929 11.29C15.6834 10.9 16.3164 10.9 16.707 11.29L18.9999 13.59L21.2929 11.29Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
