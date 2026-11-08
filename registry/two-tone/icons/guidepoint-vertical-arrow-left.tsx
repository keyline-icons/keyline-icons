import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GuidepointVerticalArrowLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M16.9997 1C19.2085 1 20.9997 2.79 20.9997 5C20.9997 6.86 19.7246 8.43 17.9997 8.87V15.13C19.7246 15.57 20.9997 17.14 20.9997 19C20.9997 21.21 19.2085 23 16.9997 23C14.7906 23 12.9997 21.21 12.9997 19C12.9997 17.14 14.2745 15.57 15.9997 15.13V8.87C14.2745 8.43 12.9997 6.86 12.9997 5C12.9997 2.79 14.7906 1 16.9997 1ZM8.6999 7.24C9.219 6.91 9.8416 6.95 10.2868 7.23C10.7232 7.51 10.9987 8 10.9987 8.55V15.45C10.9987 16 10.7232 16.49 10.2868 16.77C9.8417 17.05 9.2375 17.1 8.7184 16.77C8.7061 16.77 8.6933 16.76 8.6813 16.75L3.6837 13.3C2.7722 12.69 2.772 11.31 3.6837 10.7L8.6999 7.24Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17 8C18.6568 8 20 6.66 20 5C20 3.34 18.6568 2 17 2C15.3432 2 14 3.34 14 5C14 6.66 15.3432 8 17 8ZM17 8V16M17 16C15.3432 16 14 17.34 14 19C14 20.66 15.3432 22 17 22C18.6568 22 20 20.66 20 19C20 17.34 18.6568 16 17 16ZM9.251 8.07L4.2522 11.52C3.9159 11.73 3.9159 12.27 4.2522 12.48L9.251 15.93C9.5847 16.14 10 15.87 10 15.45V8.55C10 8.13 9.5847 7.86 9.251 8.07Z"/>
    </svg>
  )
}
