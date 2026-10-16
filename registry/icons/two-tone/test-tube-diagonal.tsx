import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TestTubeDiagonal({ size = 24, ...props }: IconProps) {
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
      <path d="M15.5176 2.2533L18.8696 4.4359C19.4364 4.805 19.7783 5.4355 19.7783 6.1119C19.7783 6.4994 19.6658 6.8785 19.4544 7.2032L10.3521 21.1826C9.6139 22.3162 8.3528 23 7 23C4.7909 23 3 21.2091 3 19C3 18.2251 3.2251 17.4668 3.6479 16.8174L12.7502 2.838C13.1193 2.2712 13.7499 1.9293 14.4263 1.9293C14.8137 1.9293 15.1929 2.0419 15.5176 2.2533Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14.9719 3.0913L18.324 5.2739C18.6074 5.4584 18.7783 5.7737 18.7783 6.1119C18.7783 6.3056 18.722 6.4952 18.6163 6.6576L9.514 20.6369C8.9604 21.4872 8.0146 22 7 22C5.3431 22 4 20.6569 4 19C4 18.4188 4.1688 17.8501 4.486 17.3631L13.5883 3.3837C13.7728 3.1003 14.0881 2.9293 14.4263 2.9293C14.62 2.9293 14.8096 2.9856 14.9719 3.0913ZM13.2959 2L20 6.3652M7.3268 13L14.4866 13" fill="none"/>
    </svg>
  )
}
